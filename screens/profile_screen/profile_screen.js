import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { supabase } from '../../services/supabase/client';
import Button from '../../components/button/button';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';
import { UserContext } from '../../services/context/usercontext';
import { DocumentUploader } from '../../components/DocumentUploader/DocumentUploader';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react';

export default function UserProfileScreen({ navigation }) {
    const { session } = useContext(UserContext);
    const [image, setImage] = useState(null)
    const [userData, setUserData] = useState({
        username: 'test',
        email: 'test',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserInfo = async () => {
            setLoading(true);
            const { data } = await supabase.auth.getUser();
            const res = await supabase
                .from('Users')
                .select()
                .eq('uid', data.user.id)
            setImage(res.data[0].avatar)
            if (data.user && res.data) {
                setUserData({ id: data.user.id, email: data.user.email, username: data.user.user_metadata.username });
                setLoading(false);
            }
        };
        if (session) getUserInfo();

    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    // ref
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['35%', '70%'], []);
    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleDismissModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <View style={styles.container}>

            {loading ? (
                <ActivityIndicator size={Sizes.screenIndicatorSize} color={Colors.accentColor} />
            ) : session ? (
                <View style={styles.userInfoContainer}>
                    {/* User mAvatar */}

                    <DocumentUploader imageAsset={image} setImageAsset={setImage} userId={userData?.id} />
                    {/* User Info */}
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{userData.username}</Text>
                        <Text style={styles.email}>{userData.email}</Text>
                    </View>
                    {/* Buttons */}
                    <View style={styles.buttonsContainer}>
                        <Button text={'More'} onButtonPress={handlePresentModalPress} />
                    </View>
                </View>
            ) : (
                <View style={styles.buttonsContainer}>
                    <Button text={'Login'} onButtonPress={() => navigation.navigate('Login')} />
                    <Button text={'Sign Up'} onButtonPress={() => navigation.navigate('SignUp')} />
                </View>
            )}
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetView style={{ padding: 20 }}>
                        <Text>Awesome </Text>
                        <Button text={'Saved Recipes'} onButtonPress={() => { handleDismissModalPress(); navigation.navigate('SavedRecipes'); }} />
                        <Button text={'Logout'} onButtonPress={() => { handleDismissModalPress(); handleLogout() }} />
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Sizes.screenPadding,
        justifyContent: 'center',
    },
    userInfoContainer: {
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: 'gray',
    },
    buttonsContainer: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
});
