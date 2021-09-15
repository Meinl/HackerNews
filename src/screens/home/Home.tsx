import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  RefreshControl,
  TouchableWithoutFeedback,
  StyleSheet,
  Alert,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { useRootSelectorState } from "../../reducers";
import { getNewsSortByPostDate } from "./selectors";
import { News } from "../../types";
import { fetchGetNewsAsync } from "./actions/getNewsActions";
import moment from "moment";
import * as WebBrowser from "expo-web-browser";
import { deleteNews } from "./actions/deleteNewsActions";
import SwipeableRow from "./components/SwipeableRow";

const ITEM_HEIGHT = 120;

export default function Home() {
  const dispatch = useDispatch();
  const rootState = useRootSelectorState((state) => state);
  const sortedNews = getNewsSortByPostDate(rootState);
  const fetchingStatusNews = useRootSelectorState(
    (state) => state.news.fetchingStatus
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchGetNewsAsync.request());
  }, []);

  const _handlePressButtonAsync = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

  const _onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchGetNewsAsync.request());
    if (!fetchingStatusNews.loading) setRefreshing(false);
  };

  const _onDeleteNews = (newsID: string) => {
    Alert.alert(
      "Delete News",
      `Are you sure you want to delete news item with ID ${newsID}?. You can't undo this action.`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => dispatch(deleteNews(newsID)) },
      ]
    );
  };

  const renderItem = useCallback(
    ({ item, index }: { item: News; index: number }) => {
      return (
        <SwipeableRow onPress={() => _onDeleteNews(item.objectID)}>
          <TouchableWithoutFeedback
            onPress={() => _handlePressButtonAsync(item.url)}
          >
            <View style={[styles.cardContainer]}>
              <Text style={styles.title}>{item.title}</Text>
              <View
                style={{
                  marginTop: "auto",
                  flexDirection: "row",
                }}
              >
                <Text style={styles.meta}>{`${item.author} · ${moment(
                  item.created_at
                ).format("LLL")}`}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SwipeableRow>
      );
    },
    []
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sortedNews}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10, flexGrow: 1 }}
        refreshControl={
          <RefreshControl onRefresh={_onRefresh} refreshing={refreshing} />
        }
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: ITEM_HEIGHT,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  meta: {
    color: "#767676",
    textTransform: "capitalize",
  },
});
