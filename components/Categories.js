import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import client, { urlFor } from "../sanity";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // Fetches the information from our Sanity.io
  useEffect(() => {
    client.fetch(`*[_type == 'category']`).then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 10,
      }}
    >
      {/* Category Cards... */}
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.Image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
}
