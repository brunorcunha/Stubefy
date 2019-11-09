import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { 
	View, 
	StatusBar, 
	TextInput, 
	Text, 
	Image,
	ScrollView, 
	ProgressBarAndroid, 
	StyleSheet, 
	TouchableOpacity 
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entities from 'html-entities'

import api from '../services/api'

import logo from '../assets/logo.png'

export default function Search ({ navigation }) {
	const [ search, setSearch ] = useState('')
	const [ db, setDB ] = useState('')
	const [ results, setResults ] = useState([])
	const [ videos, setVideos ] = useState({})
	const [ isSearching, setIsSearching ] = useState(false)
	const entities = new Entities.AllHtmlEntities()

	useEffect(
    () => {
			const handler = setTimeout(() => setDB(search), 50)    
			return () => clearTimeout(handler)  
    },
    [search]
  )

	useEffect(
    () => {
			(async () => {
        if (search) {				
					setIsSearching(true)
					const r = await yt(search)
					r.unshift(search)
					setIsSearching(false)
					setResults(r)					
					setVideos({})		
				} else {
					setResults([])
				}
      })()
    },
    [db]
  )

	async function yt (query) {
		const baseurl = 'http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q='
		const url = `${baseurl}${encodeURIComponent(query)}`
		const response = await axios.get(url)
		return response.data[1]
	}

	async function getVideos (query) {
		setIsSearching(true)
		const r = (await api.get(`./music?q=${query}`)).data
		setIsSearching(false)
		setResults([])
		setVideos(r)
	}

	return (
		<View style={styles.container}>
			<StatusBar hidden={true} />
			<View style={styles.header}>
				<TouchableOpacity onPress={() => navigation.navigate('Main')}>
					<Icon style={styles.button} name="arrow-left" size={30} color="#fff" />
				</TouchableOpacity>
				<TextInput 
					style={styles.search} 
					value={search}
					onChangeText={text => setSearch(text)}
					onSubmitEditing={() => getVideos(search)}
				/>
			</View>
			<ScrollView style={styles.list}>
				{isSearching && (
					<ProgressBarAndroid style={styles.progress} styleAttr="Horizontal" indeterminate={true} />
				)}
				{results.map((result, i) => (
					<TouchableOpacity 
						style={styles.item} 
						key={i} 
						onPress={() => getVideos(result)}
					>
						<Icon style={styles.button} name="backup-restore" size={30} color="#fff" />
						<Text style={styles.text}>{result}</Text>
					</TouchableOpacity>
				))}				
				{videos.currentPage && videos.currentPage.map((result, i) => (
					<TouchableOpacity 
						style={styles.item} 
						key={i} 
						onPress={() => navigation.navigate('Main', { 
							track: {
								title: entities.decode(result.title),
								artist: entities.decode(result.channelTitle),
								albumArtUrl: result.thumbnails.high.url,
								audioUrl: `http://localhost:3333/stream?v=${result.id}`
							} 
						})}
					>
						<Image 
							style={styles.image} 
							source={{ uri: result.thumbnails.default.url }} 
						/>
						<View>
							<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
								{entities.decode(result.title)}
							</Text>
							<Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
								{entities.decode(result.channelTitle)}
							</Text>
							<Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
								{new Date(result.publishedAt).toLocaleString()}
							</Text>
						</View>
					</TouchableOpacity>
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
    backgroundColor: '#010101'
	},
	header: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
    backgroundColor: '#111'
  },
	search: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    backgroundColor: '#222',
		height: 35,
		fontSize: 18,
		paddingVertical: 0,
		marginHorizontal: 10
  },
  button: {
    opacity: 0.72
	},
	list: {
		backgroundColor: '#010101'
	},
	item: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		opacity: 0.72,
		borderBottomWidth: 1,
		borderColor: '#333333'
	},
	text: {		
		color: '#fff',
		paddingLeft: 10,
		paddingTop: 3,
		fontSize: 18
	},
	title: {		
		color: '#fff',
		paddingLeft: 10,
		paddingTop: 5,
		fontSize: 18
	},
	subtitle: {		
		color: '#fff',
		paddingLeft: 10,
		paddingTop: 3,
		fontSize: 16
	},
	progress: {
		marginVertical: -6
	},
	image: {
		width: 120,
    height: 90
	}
})
