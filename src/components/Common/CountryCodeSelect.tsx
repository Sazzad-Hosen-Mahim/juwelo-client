import { useEffect, useState } from "react";

interface Country {
    name: { common: string };
    idd?: {
        root?: string;
        suffixes?: string[];
    };
}

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const CountryCodeSelect = ({ value, onChange }: Props) => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,idd")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch countries");
                return res.json();
            })
            .then((data: Country[]) => {
                const filtered = data
                    .filter(
                        (c) =>
                            c.idd?.root &&
                            c.idd?.suffixes &&
                            c.idd.suffixes.length > 0
                    )
                    .sort((a, b) =>
                        a.name.common.localeCompare(b.name.common)
                    );

                setCountries(filtered);
            })
            .catch((err) => {
                console.error("Country fetch error:", err);
            });
    }, []);

    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-100 w-[120px] px-2 py-2 border-r border-gray-400 focus:outline-none"
        >
            {countries.map((country, idx) => {
                const code = `${country.idd!.root}${country.idd!.suffixes![0]}`;

                return (
                    <option key={idx} value={code}>
                        {country.name.common.slice(0, 3)} ({code})
                    </option>
                );
            })}
        </select>
    );
};

export default CountryCodeSelect;
