import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import client from "../sanity";

export default function FeaturedRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState([]); // Stores the restaurants

  useEffect(() => {
    // Fetch the data from Sanity.io
    client
      .fetch(
        `*[_type == 'featured' && _id == $id]{
        ...,
        restaurants[]-> {
          ...,
          dishes[]->,
          type-> {
              name
          }
        },
      }[0]`,
        { id }
      )
      .then((data) => setRestaurants(data.restaurants));
  }, [id]);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        className="pt-4"
      >
        {/* Resturant Cards... */}
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imageUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
        {/* <RestaurantCard
          id={123}
          imageUrl="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="The Halal Guys"
          rating={4.5}
          genre="Halal"
          address="123 Main St"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={0}
        />
        <RestaurantCard
          id={123}
          imageUrl="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="The Halal Guys"
          rating={4.5}
          genre="Halal"
          address="123 Main St"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={0}
        />
        <RestaurantCard
          id={123}
          imageUrl="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="The Halal Guys"
          rating={4.5}
          genre="Halal"
          address="123 Main St"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={0}
        />
        <RestaurantCard
          id={123}
          imageUrl="https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          title="The Halal Guys"
          rating={4.5}
          genre="Halal"
          address="123 Main St"
          short_description="This is a test description"
          dishes={[]}
          long={20}
          lat={0}
        /> */}
      </ScrollView>
    </View>
  );
}
