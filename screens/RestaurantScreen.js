import {
  Image,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import {
  ChevronDoubleRightIcon,
  ChevronRightIcon,
} from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import Basket from "../components/Basket";
import { setRestaurant } from "../features/restaurantSlice";
import { useDispatch } from "react-redux";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const {
    params: {
      id,
      imageUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imageUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  return (
    <>
      <Basket />

      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imageUrl).url() }}
            className="h-56 w-full bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color="#00CCBB" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4 ">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              {/* Rating */}
              <View className="flex-row items-center space-x-1">
                <StarIcon size={22} color="green" opacity={0.5} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> • {genre}
                </Text>
              </View>

              {/* Address */}
              <View className="flex-row items-center space-x-1">
                <MapPinIcon size={22} color="gray" opacity={0.4} />
                <Text className="text-xs text-gray-500">
                  Nearby • {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6} />
            <Text className="pl-2 flex-1 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              title={dish.name}
              short_description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
