import React, { useState, useEffect } from 'react';
import { Container, Scroller, HeaderArea, HeaderTitle, PageBody, SearchArea, SearchInput, SearchButton, LoadingIcon, ListArea, BackButton } from './styles';
import { RefreshControl, Alert } from 'react-native';

import BackIcon from '../../images/back.svg';
import SearchIcon from '../../images/search.svg';

import Api from '../../Api';
import WorkerItem from '../../components/WorkerItem';
import Filter from '../../components/Filter';

export default () => {

    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const getWorkers = async () => {
        setLoading(true);
        setList([]);

        let res = await Api.getWorkers();
        
        if (res.error == '') {
            setList(res.data);
        } else {
            Alert('Erro: ' + res.error);
        }

        setLoading(false);
    }

    useEffect(() => {
        getWorkers();
    }, []);

    const onRefresh = () => {
        setRefreshing(true); 
    }

    const handleGoBackButton = () => {
        navigation.goBack();
    }

    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <BackButton onPress={handleGoBackButton}>
                        <BackIcon width="40" height="40" fill="#1C263F" />
                    </BackButton>
                    <HeaderTitle>HAPPY PET</HeaderTitle>
                </HeaderArea>

                <PageBody>
                    <SearchArea> 
                        <SearchInput 
                            placeholder="Faça sua busca..."
                            value={searchText}
                            onChangeText={o => setSearchText(o)}
                        />
                        <SearchButton onPress={getWorkers}>
                            <SearchIcon width="24" height="24" fill="#6B6B6B" />
                        </SearchButton>
                    </SearchArea>

                    <Filter />

                    {/* {loading &&
                        <LoadingIcon 
                            size='large'
                            color='#20283D'
                        />
                    } */}

                    <ListArea>
                        {/* {list.map((item) => (
                            <WorkerItem key={i} data={item} />
                        ))}; */}

                        <WorkerItem></WorkerItem>
                    </ListArea>
                </PageBody>
            </Scroller>
        </Container>
    );
}