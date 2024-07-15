import React, { useState } from "react";
import { AVPlaybackStatusSuccess, ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import { FlatList, Image, ImageBackground, TouchableOpacity, ViewToken } from "react-native";
import { icons } from "../constants";


const zoomIn = {
  0: {
    transform: [{ scale: 0.9 }],
  },
  1: {
    transform: [{ scale: 1 }],
  },
};

const zoomOut = {
  0: {
    transform: [{ scale: 1 }],
  },
  1: {
    transform: [{ scale: 0.9 }],
  },
};

interface TrendingItemProps {
  activeItem: string | null;
  item: any;
}

const TrendingItem: React.FC<TrendingItemProps> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const handlePlaybackStatusUpdate = (status:any) => {

    if (status.isLoaded) {
      if (!status.isPlaying) {
        setPlay(false);
      }

      if ((status as AVPlaybackStatusSuccess).didJustFinish) {
        setPlay(false);
      }
    } else {
      if (status.error) {
        console.log(`Encountered a fatal error during playback: ${status.error}`);
      }
    }
  };
 
  return (
    <Animatable.View
      className="mr-5"
      duration={500}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

interface TrendingProps {
  posts: any[];
}

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<string | null>(posts[1]);

  const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key as string);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      initialNumToRender={3}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
