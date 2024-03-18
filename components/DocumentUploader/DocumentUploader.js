// import * as DocumentUploader from 'expo-document-picker';
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { DocumentUpload, Trash } from "iconsax-react-native";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import { supabase } from "../../services/supabase/client";
import { Colors } from "../../constants/colors";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
export const DocumentUploader = ({ imageAsset = null, setImageAsset, userId }) => {
    const [isUploaded, setIsUploaded] = useState(Boolean(imageAsset))
    const [isUploading, setIsUploading] = useState(false)
    const [base64, setBase64] = useState(null)
    const handleUploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true
        });
        console.log(result);
        const { uri, base64 } = result.assets[0]
        setImageAsset(uri)
        setBase64(`data:image/jpg;base64,${base64}`)
    };
    const handleUpload = async () => {
        setIsUploading(true)
        let apiUrl = 'https://api.cloudinary.com/v1_1/dxudpps7i/image/upload';
        let data = {
            "file": base64,
            "upload_preset": "adde_app",
        }
        fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
        }).then(async r => {
            let data = await r.json()
            const url = data.secure_url
            const { error } = await supabase
                .from('Users')
                .update({ avatar: url })
                .eq('uid', userId)
            setIsUploading(false)
            setIsUploaded(true)
            Toast.show({
                type: 'success',
                text1: 'Image uploaded successful',
                position: 'bottom'
            })
        }).catch(err => {
            console.log(err.message)
            Alert.alert('Success', message);
            setIsUploading(false)
        })
    }
    return (
        <View className="w-72 h-72 p-4 flex items-center justify-center">
            {imageAsset ? (
                <View>
                    <Image source={{ uri: imageAsset }} style={{ width: 100, height: 100, borderRadius: 100 }} />
                    {
                        !isUploaded && <View className={'flex flex-row justify-center items-center'}>
                            <TouchableOpacity className={'mx-8'} onPress={() => setImageAsset(null)}>
                                <Trash
                                    size="32"
                                    color="#FF8A65"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity className={'mx-8'} onPress={handleUpload}>
                                {!isUploading ? <DocumentUpload
                                    size="32"
                                    color={'red'}
                                /> : <ActivityIndicator size={25} color={'black'} />}
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            ) : (
                <View className={'shadow-xl p-8 rounded-full w-[200px] h-[200px] flex items-center justify-center'}>
                    <TouchableOpacity onPress={handleUploadImage}>
                        <DocumentUpload size="25" color={Colors.accent} />
                        <Text className="text-sm ">Select Image</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}