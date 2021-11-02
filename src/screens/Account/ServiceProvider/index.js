import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, Line, UserInfoArea, UserInfo, Avatar, UserInfoName, UserInfoState, UserInfoBirth, UserButton, LoadingIcon, ServiceArea, ServiceTitle, OrganizationArea, BackButton } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import Api from '../../../Api';
import AsyncStorage from '@react-native-community/async-storage';

import ExperienceItem from '../../../components/ExperienceItem';
import CertificationItem from '../../../components/CertificationItem';
import Stars from '../../../components/Stars';

import ChatIcon from '../../../images/chat.svg';
import BackIcon from '../../../images/back.svg';
import AddIcon from '../../../images/add2.svg';

export default () => {

    const navigation = useNavigation();
    // const route = useRoute();

    // const [userInfo, setUserInfo] = useState({
    //     id: route.params.id,
    //     avatar: route.params.avatar,
    //     name: route.params.name,
    //     stars: route.params.stars
    // });

    const [userInfo, setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUserInfo = async () => {
        setLoading(true);

        let email = await AsyncStorage.getItem('email');
        let res = await Api.getUser(email);

        if (res.error == undefined) 
            setUserInfo(res);
        else 
            Alert('Erro: ' + res.error);

        setLoading(false);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    let date = new Date(userInfo.nascimento);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <ImageBackground 
                    source={require('../../../images/fundo.png')} 
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
                            <UserInfoName>{userInfo.nome}</UserInfoName>
                            <UserInfoState>{userInfo.cidade}, {userInfo.estado}</UserInfoState>
                            <UserInfoBirth>{date.getUTCDate()}/{date.getMonth() + 1}/{date.getUTCFullYear()}</UserInfoBirth>
                            <Stars stars={userInfo.mediaAvaliacao} size={20} />
                        </UserInfo>
                        <UserButton>
                            <ChatIcon width="20" height="20" fill="#00B1E1" />
                        </UserButton>
                    </UserInfoArea>

                    <ServiceArea>
                        <OrganizationArea>
                            <ServiceTitle>Experiências</ServiceTitle>
                            <AddIcon width="28" height="28" fill="#00B1E1" />
                        </OrganizationArea>
                        <ExperienceItem />

                        <Line />

                        <OrganizationArea style={{marginTop: 10}}>
                            <ServiceTitle>Certificações</ServiceTitle>
                            <AddIcon width="28" height="28" fill="#00B1E1" />
                        </OrganizationArea>
                        <CertificationItem />
                    </ServiceArea>

                    {loading &&   
                        <LoadingIcon 
                            size='large'
                            color='#20283D'
                        />
                    }

                </PageBody>
            </Scroller>
        </Container>
    );
}