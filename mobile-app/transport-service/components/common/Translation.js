// Translation.js
import React, { Component } from 'react';

import i18n from 'i18n-js'
import memoize from 'lodash.memoize'

//TODO add languages json and code
const translationGetters = {
    en: () => require('../common/resources/lang/en.json'),
    jp: () => require('../common/resources/lang/jp.json')
}

const setI18nConfig = (key) => {
    const { languageTag } = { languageTag: key };
    translations.cache.clear();
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
}

const translations = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
)

export const translateMsg = (key) => {
    //TODO will be remove
    setI18nConfig('en');
    return translations(key);
}

//TODO change language code asper settings
export const changeLanguage = (key) => {
    setI18nConfig(key);
}

export default class Translation extends Component {
  constructor(props) {
    super(props)
  }
  render() {
      
  }
}