import Head from "next/head";
import {SearchBar} from "../components/SearchBar";
import JinaClient, {
    BaseURL,
    RawDocumentData,
    SimpleResults,
    SimpleQueries,
    SimpleResult,
    AnyObject,
} from "@jina-ai/jinajs";
import {Results} from "../components/Results";
import {useEffect, useState} from "react";
import {Spinner} from "../components/Spinner";
import {useRef} from "react";
import {MediaPreview} from "../components/common/MediaPreview";
import {TextPreview} from "../components/common/TextPreview";
import {ShoppingCartIcon} from "@heroicons/react/outline";
import schema from "../types/e-commerce/schema.json"
import {OpenAPIV3} from "openapi-types";


function useJina(url?: BaseURL) {
    const [jina, setJina] = useState<JinaClient>();
    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResults[]>([]);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState("")

    const customReqSerializer = async (documents: RawDocumentData[]) => {
        console.log("documents", documents)
        const doc = documents[0]
        return {
            "data": [
                {
                    "uri": "https://storage.googleapis.com/showcase-ecommerce/images/20000.jpg",
                    "text": "t-shirt"
                }
            ],
            "parameters": {
                "top_k": 10
            }
        }
    }

    useEffect(() => {
        if (url) setJina(new JinaClient(url, schema as OpenAPIV3.Document, false, customReqSerializer));
    }, [url]);

    async function search(...documents: RawDocumentData[]) {
        setError("")
        setResults([])
        if (!jina) return;
        if (!documents.every(doc => doc instanceof File)) {
            setError("Please provide an image!")
            return;
        }
        setSearching(true);
        const {results, queries} = await jina.search(...documents);
        setSearching(false);
        setResults(results);
        setQueries(queries);
    }

    async function searchWithParameters(
        documents: RawDocumentData[],
        parameters: AnyObject
    ) {
        setResults([])
        setError("")
        let containsFile = false
        documents.forEach(doc => {
            if (doc instanceof File) containsFile = true
        })
        if (!jina) return;
        if (!containsFile) {
            setError("Please provide an image!")
            return;
        }
        setSearching(true);
        const {results, queries} = await jina.searchWithParameters(
            documents,
            parameters
        );
        setSearching(false);
        setResults(results);
        setQueries(queries);
    }

    return {
        results,
        queries,
        searching,
        search,
        searchWithParameters,
        error
    };
}

const Filter = ({
                    title,
                    onSelect,
                    current,
                    options,
                }: {
    title: string;
    current: string;
    onSelect: (option: string) => void;
    options: string[];
}) => (
    <div className="px-3 bg-blue-500 bg-opacity-10 border-2 border-blue-500 rounded flex flex-row items-center w-36">
        <select
            value={current}
            onChange={(e) => onSelect(e.target.value)}
            className="bg-transparent outline-none cursor-pointer capitalize"
        >
            <option value="">Any {title}</option>
            {options.map((item) => (
                <option value={item} key={item}>
                    {item}
                </option>
            ))}
        </select>
    </div>
);

const Filters = ({
                     onFilter,
                 }: {
    onFilter: (filters: FilterCondition[]) => void;
}) => {
    const [season, setSeason] = useState("");
    const [price, setPrice] = useState("");
    const [gender, setGender] = useState("");
    const [color, setColor] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const filters: FilterCondition[] = [];
        if (season)
            filters.push({attribute: "season", operator: "eq", value: season});
        if (price === "Under $500")
            filters.push({attribute: "price", operator: "lt", value: 500});
        if (price === "Under $200")
            filters.push({attribute: "price", operator: "lt", value: 200});
        if (color)
            filters.push({attribute: "color", operator: "eq", value: color});
        if (gender)
            filters.push({attribute: "gender", operator: "eq", value: gender});
        if (category)
            filters.push({attribute: "category", operator: "eq", value: category});

        return onFilter(filters);
    }, [season, price, gender, color, category]);

    return (
        <div className="flex flex-wrap flex-row gap-1 md:gap-4 mt-3">
            <Filter
                title="Season"
                current={season}
                onSelect={setSeason}
                options={["winter", "spring", "summer", "fall"]}
            />
            <Filter
                title="Price"
                current={price}
                onSelect={setPrice}
                options={["Under $500", "Under $200"]}
            />
            <Filter
                title="Gender"
                current={gender}
                onSelect={setGender}
                options={["boys", "girls", "men", "women"]}
            />
            <Filter
                title="color"
                current={color}
                onSelect={setColor}
                options={["red", "orange", "yellow", "green", "blue", "white", "black"]}
            />
            <Filter
                title="Category"
                current={category}
                onSelect={setCategory}
                options={["apparel", "accessories"]}
            />
        </div>
    );
};

const Tag = ({children}: { children: string }) => (
    <div className="px-2 bg-gray-500 rounded-full text-white">{children}</div>
);

const ProductResult = ({result}: { result: SimpleResult }) => {
    return (
        <div className="rounded border h-full flex flex-col">
            <div className="border-b">
                <MediaPreview src={result.data} mimeType={result.mimeType}/>
            </div>
            {result.tags && (
                <div className="flex-1 flex flex-col p-3">
                    <div className="capitalize font-semibold text-lg">
                        {result.tags.display_name}
                    </div>
                    <div className="text-gray-500 flex-1">
                        <TextPreview
                            text={result.tags.description}
                            size="sm"
                            clampLines={3}
                        />
                    </div>
                    <div className="flex flex-row gap-1 capitalize mt-2">
                        <Tag>{result.tags.usage}</Tag>
                        <Tag>{result.tags.season}</Tag>
                    </div>

                    <div className="flex flex-row items-center border-t mt-2 pt-2">
                        <div className="text-2xl font-semibold flex-1">
                            ${result.tags.price}
                        </div>
                        <div
                            className="px-4 py-1 bg-blue-600 rounded-full text-white cursor-pointer flex flex-row items-center text-sm">
                            <ShoppingCartIcon className="h-3.5 inline"/>
                            <div className="ml-1">Add to Cart</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const EmptyMessage = () => (
    <div className="text-center text-3xl text-gray-500 py-36">
        Search for something
    </div>
);

const Searching = () => (
    <div className="mx-auto text-3xl py-36 flex flex-row items-center text-primary-500">
        <Spinner/>
        <span className="animate-pulse">Searching...</span>
    </div>
);

type FilterCondition = {
    attribute: string;
    operator: "eq" | "ne" | "lt" | "gt" | "le" | "ge";
    value: string | number;
};

export default function Home() {
    const url = 'https://europe-west3-jina-showcase.cloudfunctions.net/prod/shop-the-look'
    const [filters, setFilters] = useState<FilterCondition[] | undefined>();
    const [originalDocuments, setOriginalDocuments] = useState<RawDocumentData[]>(
        []
    );
    const {results, searching, search, searchWithParameters, queries, error} =
        useJina(url);
    const urlInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (...documents: RawDocumentData[]) => {
        setOriginalDocuments(documents);
        if (filters) searchWithParameters(documents, {conditions: filters});
        else search(...documents);
    };

    const filter = (filters: FilterCondition[]) => {
        console.log("filtering with", originalDocuments, filters);
        if (originalDocuments.length)
            searchWithParameters(originalDocuments, {conditions: filters});
        setFilters([...filters]);
    };

    console.log("results", results)

    return (
        <>
            <Head>
                <title>Shop The Look</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <SearchBar search={handleSearch} searching={searching}/>
            <Filters onFilter={filter}/>
            <div className="h-6 text-red-500">
                {error}
            </div>
            {searching ? (
                <Searching/>
            ) : results.length ? (
                <>
                    <Results
                        results={results}
                        CustomResultItem={ProductResult}
                        classNames="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4"
                    />
                </>
            ) : (
                <EmptyMessage/>
            )}
        </>

    );
}
