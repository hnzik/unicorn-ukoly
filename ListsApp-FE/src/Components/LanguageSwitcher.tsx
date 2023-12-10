import { useTranslation } from "react-i18next"

const langs = [
    {
        label:"cs",
        value:"cs"
    },
    {
        label:"en",
        value:"en"
    }
]

const LanguageSwitcher:React.FC = () => {
    const {i18n} = useTranslation()

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(event.target.value);
    };

    return (
        <div className="flex items-center">
            <select
                onChange={handleLanguageChange}
                className="bg-gray-700 text-white border border-gray-600 rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                {langs.map((lang, index) => (
                    <option key={index} value={lang.value}>{lang.label}</option>
                ))}
            </select>
        </div>
    );
}

export default LanguageSwitcher