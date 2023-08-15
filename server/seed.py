#!/usr/bin/env python3
from models import Car

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        car_data = [
            {'year': 2022, 'make': 'Lamborghini', 'model': 'Urus', 'cost': '225,500', 'image':'https://www.blucarrental.com/cdn/shop/products/2020LamborghiniUrusRentalFrontSideBlack_Fotor_3888x.jpg?v=1618383155',},
            {'year': 2022, 'make': 'Lamborghini', 'model': 'Huracan EVO Coupe', 'cost': '275,000', 'image':'https://www.bentleygoldcoast.com/imagetag/9649/2/l/New-2022-Lamborghini-Huracan-LP-610-4-EVO-1636842073.jpg',},
            {'year': 2022, 'make': 'Lamborghini', 'model': 'Aventador', 'cost': '375,000', 'image':'https://cdn.carbuzz.com/gallery-images/1600/975000/400/975439.jpg',},

            {'year': 2022, 'make': 'Ferrari', 'model': 'LaFerrari', 'cost': '5,360,000', 'image':'https://bringatrailer.com/wp-content/uploads/2022/07/2014_ferrari_laferrari_img_0541-2-09166.jpg',},
            {'year': 2022, 'make': 'Ferrari', 'model': 'Enzo', 'cost': '2,800,000', 'image':'https://exoticmotorsmidwest.com/wp-content/uploads/2022/01/word-image-e1642161373881.jpeg',},
            {'year': 2022, 'make': 'Ferrari', 'model': 'Portofino M', 'cost': '227,000', 'image':'https://cdn.ebizautos.media/used-2022-ferrari-portofino_m-convertible-12494-22022596-1-640.jpg',},

            {'year': 2022, 'make': 'Bugatti', 'model': 'Veyron', 'cost': '1,600,000', 'image':'https://images.hindustantimes.com/auto/img/2022/02/28/1600x900/Veyron_(2)_1646024624292_1646024629174.jpg',},
            {'year': 2022, 'make': 'Bugatti', 'model': 'Chiron', 'cost': '3,300,000', 'image':'https://bringatrailer.com/wp-content/uploads/2022/05/2021_bugatti_chiron-put-sport_9eff5195-81c4-451c-b74b-363b2beb5ca3-88164.jpeg',},
        ]

        with app.app_context():
                db.session.bulk_insert_mappings(Car, car_data)
                db.session.commit()

