
import React, { useEffect, useState, useCallback } from 'react'
import { WebView } from 'react-native-webview';
import { View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Button from '../../components/button/button'
import { useNavigation } from '@react-navigation/native';
export default function Youtube_Screen({ route }) {
    const { youtubeId, mealName } = route.params
    const id = youtubeId.split("=").pop()

    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({ title: mealName })
    }, [])
    const [playing, setPlaying] = useState(false);
    const [isReady, setIsReady] = useState(false)

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);
    const onReady = useCallback(() => {
        setIsReady(true);
        setPlaying(true)
    }, []);
    return (
        // <WebView
        //     source={{ uri: youtubeId }}

        // />
        <View style={{ padding: 20 }}>
            <YoutubePlayer
                onReady={onReady}
                height={200}
                play={playing}
                videoId={id}
                onChangeState={onStateChange}
            />
            {isReady && <Button text={playing ? "pause" : "play"} onButtonPress={togglePlaying} />}
        </View >

    )
}