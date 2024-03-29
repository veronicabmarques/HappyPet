import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import EditIcon from '../images/edit.svg';

export const ExperienceArea = styled.View`
    width: 100%;
    margin-top: 15px;
`;

export const OrganizationArea = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const OrganizationTitle = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const BigBall = styled.View`
    width: 18px;
    height: 18px;
    background: #FFFFFF;
    border: 1px solid rgba(0, 177, 225, 0.7);
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const SmallBall = styled.View`
    width: 9px;
    height: 9px;
    background: rgba(0, 177, 225, 0.7);
    border-radius: 8px;
`;

export const ExperienceTitle = styled.Text`
    font-weight: 500;
    font-size: 16px;
    color: #1C263F;
    margin-left: 8px;
`;

export const ExperienceDescription = styled.Text`
    font-size: 14px;
    color: #858585;
    margin: 3px 0 10px 25px;
`;

export const SwipeDot = styled.View`
    width: 10px;
    height: 10px;
    background-color: #00B1E1;
    border-radius: 5px;
    margin: 2px;
`;

export const SwipeDotActive = styled.View`
    width: 10px;
    height: 10px;
    background-color: #1C263F;
    border-radius: 5px;
    margin: 2px;
`;

export const SwipeItem = styled.View`
    flex: 1;
    background-color: #00B1E1;
`;

export const SwipeImage = styled.Image`
    width: 100%;
    height: 200px;
`;

const Line = styled.View`
    width: 100%;
    border: 1px solid rgba(230, 230, 230, 1);
    margin-bottom: 10px;
`;

export default ({data}) => {
    return (
        <><ExperienceArea>
            <OrganizationArea>
                <OrganizationTitle>
                    <BigBall>
                        <SmallBall></SmallBall>
                    </BigBall>
                    <ExperienceTitle>{data.titulo}</ExperienceTitle>
                </OrganizationTitle>
            </OrganizationArea>
            <ExperienceDescription>{data.descricao}</ExperienceDescription>
            <Swiper
                style={{ height: 200 }}
                dot={<SwipeDot />}
                activeDot={<SwipeDotActive />}
                paginationStyle={{ top: 15, right: 15, bottom: null, left: null }}
                autoplay={true}
            >
                {/* {userInfo.photos.map((item, key) => {
        <SwiperItem key={key}>
            <SwiperImage source={{uri: item.url}} resizeMode="cover" />
        </SwiperItem>
    })} */}

                <SwipeItem>
                    <SwipeImage source={require('../images/fundo.png')} resizeMode="cover" />
                </SwipeItem>

                <SwipeItem>
                    <SwipeImage source={require('../images/fundo.png')} resizeMode="cover" />
                </SwipeItem>
            </Swiper>
        </ExperienceArea><Line /></>
    );
}