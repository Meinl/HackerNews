import React, {useEffect, useState} from 'react'
import { View, Text, RefreshControl, TouchableWithoutFeedback, Animated, StyleSheet, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { useRootSelectorState } from '../../reducers'
import { getNewsSortByPostDate } from './selectors'
import { News } from '../../types'
import { fetchGetNewsAsync } from './actions/getNewsActions'
import moment from 'moment'
import * as WebBrowser from 'expo-web-browser';
import { deleteNews } from './actions/deleteNewsActions'
import SwipeableRow from './components/SwipeableRow'

const ITEM_HEIGHT = 120;

export default function Home() {

	const dispatch = useDispatch()
	const rootState = useRootSelectorState(state => state)
	const sortedNews = getNewsSortByPostDate(rootState)
	const fetchingStatusNews = useRootSelectorState(state => state.news.fetchingStatus)
	const scrollY = React.useRef(new Animated.Value(0)).current

	const [refreshing, setRefreshing] = useState(false)

	useEffect(() => {
		dispatch(fetchGetNewsAsync.request())
	}, [])

	const _handlePressButtonAsync = async (url: string) => {
    await WebBrowser.openBrowserAsync(url);
  };

	const _onRefresh = () => {
		setRefreshing(true)
		dispatch(fetchGetNewsAsync.request())
		if(!fetchingStatusNews.loading) setRefreshing(false)
	}

	const _onDeleteNews = (newsID: string) => {
		Alert.alert(
      "Delete News",
      `Are you sure you want to delete news item with ID ${newsID}?. You can't undo this action.`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => dispatch(deleteNews(newsID)) }
      ]
    );
	}

	const renderItem = ({ item, index }: { item: News; index: number }) => {

		const inputRange = [-1, 0, index * (ITEM_HEIGHT + 10), (index + 2) * (ITEM_HEIGHT + 10)]
		const scale = scrollY.interpolate({
			inputRange,
			outputRange: [1,1, 1, 0]
		})
		const inputRangeOpacity = [-1, 0, index * (ITEM_HEIGHT + 10), (index + 1) * (ITEM_HEIGHT + 10)]
		const opacity = scrollY.interpolate({
			inputRange: inputRangeOpacity,
			outputRange: [1, 1, 1, 0]
		})

		return (
			<SwipeableRow onPress={() => _onDeleteNews(item.objectID)}>
				<TouchableWithoutFeedback onPress={() => _handlePressButtonAsync(item.url)}>
				<Animated.View style={[styles.cardContainer, {opacity, transform:[{scale}]}]}>
					<Text style={styles.title}>{item.title}</Text>
	 				<View style={{
	 					marginTop: 'auto',
						flexDirection: 'row'
	 				}}>
						<Text style={styles.meta}>{`${item.author} · ${moment(item.created_at).format('LLL')}`}</Text>
	 				</View>
	 			</Animated.View>
				</TouchableWithoutFeedback>
					
			</SwipeableRow>
		)
	}

	return(
		<View style={{flex:1}}>
			<Animated.FlatList
				data={sortedNews}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
				onScroll={Animated.event(
					[{nativeEvent: {contentOffset: {y: scrollY}}}],
					{useNativeDriver: true}
				)}
				contentContainerStyle={{padding:10, flexGrow:1}}
				refreshControl={<RefreshControl  onRefresh={_onRefresh} refreshing={refreshing} />}
				keyExtractor={(_, index) => index.toString()}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	cardContainer: {
		height: ITEM_HEIGHT, 
		backgroundColor:'white', 
		padding:10, 
		marginBottom:10, 
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,

		elevation: 2,
	},
	title: {
		fontSize:18,
		fontWeight:'600'
	},
	meta: {
		color:'#767676',
		textTransform:'capitalize'
	}
})