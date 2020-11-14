import React, {useState, createContext} from 'react';

import * as articleList from './DummyData/ARTICLES.js'

const ArticleContext = createContext(null)

function ArticleProvider(props) {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const refreshArticles = () => {
        setIsLoading(true)

        setTimeout(() => {
            setArticles(articleList.default)
            setIsLoading(false)
        }, 1500)
    }

    return (
        <ArticleContext.Provider value={{articles, isLoading, refreshArticles}}>
            {props.children}
        </ArticleContext.Provider>
    );
}

export {ArticleProvider, ArticleContext};