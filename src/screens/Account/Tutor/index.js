import React, { useState, useEffect } from 'react';
import { ImageBackground, FlatList } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserInfoBirth, UserButton, LoadingIcon, PetArea, PetTitle, OrganizationArea } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import Api from '../../../Api';

import Pets from '../../../components/Pets';

import EditIcon from '../../../images/edit.svg';

export default () => {

    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserInfo = async () => {
        setLoading(true);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getUser(email);

        if (res.error == undefined) 
            setUserInfo(res);
        else 
            console.log('Erro: ' + res.error);

        setLoading(false);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    const handleEditClick = () => {
        navigation.navigate('EditAccount', { id: id, email: email });
    }

    let date = new Date(userInfo.nascimento);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <ImageBackground 
                    source={require('../../../images/fundo3.png')} 
                    resizeMode="cover" 
                    style={{ width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' }} 
                />

                <PageBody>
                    <UserInfoArea>
                        {userInfo.genero == "Masculino" ?
                            <Avatar source={require('../../../images/avatar.jpg')} />
                        : <Avatar source={require('../../../images/avatarMulher.jpg')} />
                        }

                        <UserInfo>
                            {loading &&   
                                <LoadingIcon 
                                    size='large'
                                    color='#20283D'
                                />
                            }

                            <UserInfoName>{userInfo.nome}</UserInfoName>
                            <UserInfoState>{userInfo.cidade}, {userInfo.estado}</UserInfoState>
                            <UserInfoBirth>{date.getUTCDate()}/{date.getMonth() + 1}/{date.getUTCFullYear()}</UserInfoBirth>
                        </UserInfo>
                        <UserButton onPress={handleEditClick}>
                            <EditIcon width="30" height="30" fill="#00B1E1" />
                        </UserButton>
                    </UserInfoArea>

                    <PetArea>
                        <OrganizationArea>
                            <PetTitle>Pets</PetTitle>
                        </OrganizationArea>
                        <FlatList 
                            horizontal
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            legacyImplementation={false}
                            data={userInfo.pets}
                            keyExtractor={(item) => item.id}
                            renderItem={ ({item}) => <Pets data={item}/>}
                        />

                    </PetArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}