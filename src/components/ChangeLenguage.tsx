import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
//Components
//Language
import { useTranslation } from 'react-i18next';
import i18n from '../config/i18n';
import languageOptions from '../config/languageOptions';
import LanguageIcon from '@material-ui/icons/Language';

//TODO agregar el nombre del restaurante en el header
const ChangeLenguage = ({ showIdClient }: any) => {
    const { t } = useTranslation();
    const [lang, setLang] = useState(languageOptions[0]);

    const changeLang = async (language: any) => {
        setLang(language);
        i18n.changeLanguage(language.value);
    };

    return (<>
        {showIdClient && <h3 style={{
            color: "black",
            background: "white",
            width: "40%",
            marginTop: "11px"
        }}
        ><strong>Código o número de orden: {localStorage.getItem("oldSocketClientId")}</strong></h3>}
        <ButtonGroup style={{ float: "right", marginTop: "5px" }} variant="text" color="primary" aria-label="text primary button group">
            {languageOptions.map((action: any, index: number) => {
                return <Button key={index} startIcon={
                    <LanguageIcon />}
                    variant={action.value === lang.value ? "contained" : "outlined"}
                    onClick={() => changeLang(action)}>{t(action.shortLabel)}</Button>
            })} </ButtonGroup>
    </>

    );
};

export default ChangeLenguage;