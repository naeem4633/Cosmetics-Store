from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, SavedItem, Order
from .serializers import ProductSerializer, SavedItemSerializer, RegistrationSerializer
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.db.models import Q

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
@api_view(['POST'])
def product_search(request):
    query = request.data.get('query', '')
    products = Product.objects.filter(Q(name__icontains=query) | Q(brand__icontains=query))
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def brand_products(request, brand_name):
    # Filter products based on the provided brand_name
    products = Product.objects.filter(brand__iexact=brand_name)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def category_products(request, category_name):
    # Filter products based on the provided brand_name
    products = Product.objects.filter(category__iexact=category_name)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=404)

    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['POST'])
def product_create(request):
    data = request.data

    serializer = ProductSerializer(data=data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def saveditem_list(request):
    user_id = request.session.get('user_id', None)
    if user_id is not None:
        user = User.objects.get(id=request.session.get('user_id'))
    else:
        user = None
    saveditems = SavedItem.objects.filter(user=user)
    serializer = SavedItemSerializer(saveditems, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def saveditem_detail(request, pk):
    saveditem = get_object_or_404(SavedItem, pk=pk)
    serializer = SavedItemSerializer(saveditem)
    return Response(serializer.data)

@api_view(['POST'])
def saveditem_create(request):
    product_id = request.data.get('product')
    is_cart = request.data.get('is_cart', False)
    is_wishlist = request.data.get('is_wishlist', False)
    quantity = int(request.data.get('quantity', 1))
    
    user_id = request.session.get('user_id', None)
    if user_id is not None:
        user = User.objects.get(id=request.session.get('user_id'))
    else:
        user = None

    saved_item, created = SavedItem.objects.get_or_create(
        product_id=product_id,
        is_cart=is_cart,
        is_wishlist=is_wishlist,
        user=user,  # Associate the user with the saved item
        quantity=quantity
    )

    if not created:
        saved_item.quantity += quantity
    else:
        saved_item.quantity = quantity

    saved_item.save()
    serializer = SavedItemSerializer(saved_item)
    return Response(serializer.data, status=201)

@api_view(['DELETE'])
def saveditem_delete(request, pk):
    try:
        saved_item = SavedItem.objects.get(id=pk)
        saved_item.delete()
        return Response(status=204)

    except SavedItem.DoesNotExist:
        return Response(status=404)
    
@api_view(['GET'])
def cart_items(request):
    cart_items = SavedItem.objects.filter(user=request.session.get('user_id'), is_cart=True)
    serializer = SavedItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def wishlist_items(request):
    wishlist_items = SavedItem.objects.filter(user=request.session.get('user_id'), is_wishlist=True)
    serializer = SavedItemSerializer(wishlist_items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def order_create(request):
    user_id = request.session.get('user_id', None)
    if user_id is not None:
        user = User.objects.get(id=user_id)
    else:
        return Response({'error': 'User not found'}, status=400)

    saved_items_data = request.data.get('saved_items', [])
    saved_items_ids = [item['id'] for item in saved_items_data]
    saved_items = SavedItem.objects.filter(id__in=saved_items_ids)

    if not saved_items:
        return Response({'error': 'No saved items found'}, status=400)

    # Create the order
    order = Order.objects.create(user=user)

    # Add the saved items to the order
    order.saved_items.add(*saved_items)

    # Add other relevant data to the order if needed

    return Response({'message': 'Order created successfully', 'order_id': order.id}, status=201)

@api_view(['POST'])
def login(request):
    """     
    Login a user and return a token, username, and user id.
    """
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User does not exist'})

    if not user.check_password(password):
        return Response({'error': 'Invalid password'})

    if not request.session.exists(request.session.session_key):
        request.session.create()
    token, created = Token.objects.get_or_create(user=User.objects.get(id=user.id))
    request.session['user_id'] = user.id
    return Response({
        'session_key' : request.session.session_key,
        'token': token.key,
        'username': user.username,
        'user_id': user.id,
        'user_email': user.email
    })

@api_view(['POST'])
def register(request):
    """
    Register a new user.
    """
    serializer = RegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data['password'])  # Set and hash the password
        user.save()
        return Response({'success': 'User registered successfully'})
    else:
        return Response(serializer.errors, status=400)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout a user.
    """
    request.user.auth_token.delete()
    return Response({'success': 'User logged out successfully'})