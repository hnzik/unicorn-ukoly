import { useTranslation } from "react-i18next";

const NoMatch: React.FC = () => {
    const {t} = useTranslation()

    return <div>
        {t('pages.noMatch.notFound')}
    </div>
}

export default NoMatch;