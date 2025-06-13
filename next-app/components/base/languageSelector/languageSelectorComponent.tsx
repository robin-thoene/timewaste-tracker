import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

const LanguageSelector = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    return (
        <div className="flex flex-row">
            {i18n.language !== 'en' ? (
                <Link aria-label={t('languageButtonEnAriaLabel') ?? undefined} className="flex p-3" href={router.asPath} locale={'en'}>
                    {t('en')}
                </Link>
            ) : (
                <div className="flex p-3 text-blue-400">{t('en')}</div>
            )}
            {i18n.language !== 'de' ? (
                <Link aria-label={t('languageButtonDeAriaLabel') ?? undefined} className="flex p-3" href={router.asPath} locale={'de'}>
                    {t('de')}
                </Link>
            ) : (
                <div className="flex p-3 text-blue-400">{t('de')}</div>
            )}
        </div>
    );
};

export default LanguageSelector;
