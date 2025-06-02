"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { fetchSlides } from "@/lib/redux/slices/sliderSlice";

// This is a custom hook to fetch slider data from Strapi API
export const useFetchSliderData = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch slider data when the component mounts
    dispatch(fetchSlides());
  }, [dispatch]);
};

// Mock API service for development (to be replaced with actual API calls)
export const mockStrapiAPI = {
  // This function simulates fetching data from Strapi
  getSlides: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock data structure similar to what we'd expect from Strapi
    return {
      data: [
        {
          id: 1,
          attributes: {
            title: "Lorem Ipsum",
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            buttonText: "Read More",
            buttonLink: "/about",
            image: {
              data: {
                attributes: {
                  url: "/placeholder-image-1.jpg",
                },
              },
            },
          },
        },
        {
          id: 2,
          attributes: {
            title: "Professional Services",
            description: "We provide professional legal services with a focus on client satisfaction and results",
            buttonText: "Our Services",
            buttonLink: "/services",
            image: {
              data: {
                attributes: {
                  url: "/placeholder-image-2.jpg",
                },
              },
            },
          },
        },
        {
          id: 3,
          attributes: {
            title: "Expert Team",
            description: "Our team of experts is ready to help you navigate complex legal challenges",
            buttonText: "Meet Our Team",
            buttonLink: "/team",
            image: {
              data: {
                attributes: {
                  url: "/placeholder-image-3.jpg",
                },
              },
            },
          },
        },
      ],
    };
  },
};
