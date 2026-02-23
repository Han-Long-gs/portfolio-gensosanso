// saves a few lines of code phew
import dict_zh from "./dict.zh";
import dict_en from "./dict.en";
import { useAppContext } from "../state/AppContext";

export function useDict() {
    const { language } = useAppContext();
    return language === "en" ? dict_en : dict_zh;
}