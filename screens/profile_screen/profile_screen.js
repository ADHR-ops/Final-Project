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
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import ScreenHead from '../../components/ScreenHead/ScreenHead';
import { CustomStyles } from '../../constants/custom_styles';
import { AddSquare, Information, Login, Menu, More, PasswordCheck, Personalcard, Profile2User, Save2 } from 'iconsax-react-native';
import { Linking } from 'react-native';
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
            if (data.user) {
                setUserData({ id: data.user.id, email: data.user.email, username: data.user.user_metadata.username });
            }
            const res = await supabase
                .from('Users')
                .select()
                .eq('uid', data.user.id)

            if (res?.data[0].avatar != null)
                setImage(res.data[0].avatar)
            else
                setImage(null)
            setLoading(false);
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
    if (loading)
        return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={Sizes.screenIndicatorSize} color={Colors.accentColor} />
        </View>
    return (
        <View style={[styles.container, { padding: Sizes.screenPadding }]}>
            <ScreenHead title='settings Screen' />

            {session ? (
                <View style={styles.userInfoContainer}>
                    {/* User mAvatar */}
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <DocumentUploader imageAsset={image} setImageAsset={setImage} userId={userData?.id} />
                    </View>
                    {/* User Info */}
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{userData.username}</Text>
                        <Text style={styles.email}>{userData.email}</Text>
                    </View>
                    {/* Buttons */}
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.privacypolicies.com/live/e18297c5-20e1-4779-8bb8-c79d5c880c63') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30 }}>
                        <View style={[CustomStyles.button, { backgroundColor: 'rgba(60, 145, 230,0.1)', width: '18%' }]}>
                            <Information size="30" color={'rgb(60, 145, 230)'} />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>About Us</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.privacypolicies.com/live/e18297c5-20e1-4779-8bb8-c79d5c880c63') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30 }}>
                        <View style={[CustomStyles.button, { backgroundColor: 'rgba(60, 15, 150,0.1)', width: '18%' }]}>
                            <Personalcard size="28" color={'rgba(60, 15, 150,1)'} />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />


                    <TouchableOpacity onPress={handlePresentModalPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30 }}>
                        <View style={[CustomStyles.button, { backgroundColor: 'rgba(30, 185, 128, 0.1)', width: '18%' }]}>
                            <More size="28" color={'rgba(30, 185, 128, 1)'} />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>More Option</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />

                </View>
            ) : (
                //if not logged in
                <View style={styles.buttonsContainer}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{ width: 200, height: 200 }} source={require("../../assets/settings.png")} />
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30 }}>
                        <View style={[CustomStyles.button, { backgroundColor: 'rgba(30, 185, 128, 0.1)', width: '18%' }]}>
                            <Login size="30" color={Colors.accentColor} />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>Login</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30 }}>
                        <View style={[CustomStyles.button, { backgroundColor: 'rgba(60, 145, 230,0.1)', width: '18%' }]}>
                            <AddSquare size="30" color={'rgb(60, 145, 230)'} />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>signup</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <TouchableOpacity onPress={() => { Linking.openURL('https://www.privacypolicies.com/live/e18297c5-20e1-4779-8bb8-c79d5c880c63') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30 }}>
                        <View style={[CustomStyles.button, { backgroundColor: 'rgba(60, 15, 150,0.1)', width: '18%' }]}>
                            <Profile2User size="30" color={'rgba(60, 15, 150,0.3)'} />
                        </View>
                        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>About Us</Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            marginVertical: 20,
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />

                    {/* <View style={{ gap: 20, width: '100%' }}>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Already have an account
                            </Text>
                            <Button text={'Login'} onButtonPress={() => navigation.navigate('Login')} />
                        </View>
                        <View style={{ width: '100%' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                                Didnt have an account? Signup right now...
                            </Text>
                            <Button text={'Sign Up'} onButtonPress={() => navigation.navigate('SignUp')} />
                        </View>
                    </View> */}
                </View>
            )
            }

            {/* Bottom sheet */}
            <View style={styles.container}>
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    style={{ backgroundColor: Colors.lightAccentColor }}
                >
                    <BottomSheetView style={{ padding: 20 }}>

                        <TouchableOpacity onPress={() => { handleDismissModalPress(); navigation.navigate('SavedRecipes') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30 }}>
                            <View style={[CustomStyles.button, { backgroundColor: 'rgba(60, 15, 150,0.1)', width: '18%' }]}>
                                <Save2 size="28" color={'rgba(60, 15, 150,1)'} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>Saved Recipes</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { handleDismissModalPress(); navigation.navigate('UpdatePassword') }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 30, marginVertical: 20 }}>
                            <View style={[CustomStyles.button, { backgroundColor: 'rgba(60, 145, 230,0.1)', width: '18%' }]}>
                                <PasswordCheck size="28" color={'rgba(60, 145, 230,1)'} />
                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.primaryColor }}>Update Password</Text>
                        </TouchableOpacity>

                        <View style={{ marginVertical: 20 }}>
                            <Button text={'Logout'} onButtonPress={() => { handleDismissModalPress(); handleLogout() }} />
                        </View>
                    </BottomSheetView>
                </BottomSheetModal>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        padding: Sizes.screenPadding,
        justifyContent: 'center',

    },
    userInfoContainer: {
        flex: 1
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 40,
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

    },
});
