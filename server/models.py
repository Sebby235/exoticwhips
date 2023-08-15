from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from werkzeug.security import generate_password_hash, check_password_hash



metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password_hash = db.Column(db.String)

    orders = db.relationship('Order', back_populates = 'user')
    cars = association_proxy('orders', 'car')
    reviews = db.relationship('Review', back_populates = 'user')

    serialize_rules = ('-orders.user',)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    @property
    def  is_active(self):
        return True
    
    def get_id(self):
        return str(self.id)
    
    @property
    def is_authenticated(self):
        return True
    
    @property
    def is_active(self):
        return True
    
    @property
    def is_anonymous(self):
        return False

    def __repr__(self):
        return f'<User {self.id}: {self.name}>'
    
class Car(db.Model, SerializerMixin):
    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key = True) 
    year = db.Column(db.Integer)
    make = db.Column(db.String)
    model = db.Column(db.String)
    image = db.Column(db.String)
    cost = db.Column(db.Integer)

    orders = db.relationship('Order', back_populates = 'car')
    users = association_proxy('orders', 'user')
    reviews = db.relationship('Review', back_populates = 'car')

    serialize_rules = ('-orders',)

    def __repr__(self):
        return f'<Car {self.id}: {self.make} {self.model}>'


class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))

    car = db.relationship('Car', back_populates = 'orders')
    user = db.relationship('User', back_populates = 'orders')

    serialize_rules = ('-user.orders', '-car.orders',)

    def __repr__(self):
        return f'<Order {self.id}>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key = True)
    comment = db.Column(db.String)
    car_id = db.Column(db.Integer, db.ForeignKey('cars.id'))
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'reviews')
    car = db.relationship('Car', back_populates = 'reviews')

    def __repr__(self):
        return f'<Review {self.id}: {self.comment}'