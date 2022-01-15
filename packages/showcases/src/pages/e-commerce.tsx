import Head from "next/head";
import JinaClient, {
    RawDocumentData,
    SimpleResults,
    SimpleQueries,
    AnyObject,
    fileToBase64,
} from "@jina-ai/jinajs";
import {Results} from "../components/Results";
import React, {useEffect, useState, useCallback, useRef} from "react";
import {Spinner} from "../components/Spinner";
import {MediaPreview} from "../components/common/MediaPreview";
import {TextPreview} from "../components/common/TextPreview";
import {ShoppingCartIcon} from "@heroicons/react/outline";
import schema from "../types/e-commerce/schema.json"
import {OpenAPIV3} from "openapi-types";
import Dropzone from 'react-dropzone'
import {isValidHttpUrl} from "../utils/utils";
import About from "../components/common/About";
import { ExampleQueries, ExampleQueryItem } from "../components/common/ExampleQueries";

const SearchIcon = '/assets/searchIcon.svg'

const exampleQueries: ExampleQueryItem[] = [
    {src:"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/6429239/pexels-photo-6429239.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/6046226/pexels-photo-6046226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/6368922/pexels-photo-6368922.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/4030611/pexels-photo-4030611.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/8483418/pexels-photo-8483418.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/6311641/pexels-photo-6311641.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/9558912/pexels-photo-9558912.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/6969983/pexels-photo-6969983.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/4869794/pexels-photo-4869794.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/9499143/pexels-photo-9499143.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.pexels.com/photos/6311599/pexels-photo-6311599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=300&w=504",mimeType:"image"},
    {src:"https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",mimeType:"image"},
    {src:"https://images.unsplash.com/photo-1627225924765-552d49cf47ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",mimeType:"image"},
    {src:"https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",mimeType:"image"},
    {src:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=997&q=80",mimeType:"image"},

    // TODO get back
    // {src:"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",mimeType:"image",text:"black"},
    // {src:"https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",mimeType:"image",text:"blue"},
]
import { debounce } from '../utils/utils';

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
            <option value="">{title}</option>
            {options.map((item) => (
                <option value={item} key={item}>
                    {item}
                </option>
            ))}
        </select>
    </div>
);

const Filters = ({ onFilter, }: { onFilter: (filters: FilterCondition[]) => void }) => {
    const [model, setModel] = useState("8080");
    {/*TODO bring back*/}
    const [season, setSeason] = useState("");
    const [price, setPrice] = useState("");
    const [gender, setGender] = useState("");
    const [color, setColor] = useState("");
    const [category, setCategory] = useState("");
    useEffect(() => {
        const filters: FilterCondition[] = [];
        // if (season)
        //     filters.push({attribute: "season", operator: "eq", value: season});
        // if (price === "Under $500")
        //     filters.push({attribute: "price", operator: "gt", value: 500});
        // if (price === "Under $200")
        //     filters.push({attribute: "price", operator: "lt", value: 200});
        // if (color)
        //     filters.push({attribute: "color", operator: "eq", value: color});
        // if (gender)
        //     filters.push({attribute: "gender", operator: "eq", value: gender});
        // if (category)
        //     filters.push({attribute: "category", operator: "eq", value: category});
        if (model)
            filters.push({attribute: "model", operator: "eq", value: model});

        return onFilter(filters);

    }, [model, season, price, gender, color, category]);

    return (
        <div className="flex flex-wrap flex-row gap-1 md:gap-4 mt-3">
            <Filter
                title="Model"
                current={model}
                onSelect={setModel}
                options={["resnet_untrained", "resnet_tll_finetuner", "resnet_finetuner", "resnet_custom", "resnet_multi_objective", "vit_custom"]}
            />

            {/*TODO bring back*/}
            {/*<Filter*/}
            {/*    title="Season"*/}
            {/*    current={season}*/}
            {/*    onSelect={setSeason}*/}
            {/*    options={["winter", "spring", "summer", "fall"]}*/}
            {/*/>*/}
            {/*<Filter*/}
            {/*    title="Price"*/}
            {/*    current={price}*/}
            {/*    onSelect={setPrice}*/}
            {/*    options={["Under $500", "Under $200"]}*/}
            {/*/>*/}
            {/*<Filter*/}
            {/*    title="Gender"*/}
            {/*    current={gender}*/}
            {/*    onSelect={setGender}*/}
            {/*    options={["boys", "girls", "men", "women"]}*/}
            {/*/>*/}
            {/*<Filter*/}
            {/*    title="color"*/}
            {/*    current={color}*/}
            {/*    onSelect={setColor}*/}
            {/*    options={["red", "orange", "yellow", "green", "blue", "white", "black"]}*/}
            {/*/>*/}
            {/*<Filter*/}
            {/*    title="Category"*/}
            {/*    current={category}*/}
            {/*    onSelect={setCategory}*/}
            {/*    options={["apparel", "accessories"]}*/}
            {/*/>*/}
        </div>
    );
};

const Tag = ({children}: { children: string }) => (
    <div className="px-2 bg-gray-500 rounded-full text-white">{children}</div>
);

const ProductResult = ({result}: { result: any }) => {
    return (
        <div className="rounded border h-full flex flex-col">
            <div className="border-b">
                <MediaPreview src={result.uri} mimeType={result.mimeType}/>
            </div>
            {/*{result.tags && (*/}
            {/*    <div className="flex-1 flex flex-col p-3">*/}
                    {/*<div className="capitalize font-semibold text-lg">*/}
                    {/*    {result.tags.display_name}*/}
                    {/*</div>*/}
                    {/*<div className="text-gray-500 flex-1">*/}
                    {/*    <TextPreview*/}
                    {/*        text={result.tags.description}*/}
                    {/*        size="sm"*/}
                    {/*        clampLines={3}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div className="flex flex-row gap-1 capitalize mt-2">*/}
                    {/*    <Tag>{result.tags.usage}</Tag>*/}
                    {/*    <Tag>{result.tags.season}</Tag>*/}
                    {/*</div>*/}

                    {/*<div className="flex flex-row items-center border-t mt-2 pt-2">*/}
                    {/*    <div className="text-2xl font-semibold flex-1">*/}
                    {/*        ${result.tags.price}*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className="px-4 py-1 bg-blue-600 rounded-full text-white cursor-pointer flex flex-row items-center text-sm">*/}
                    {/*        <ShoppingCartIcon className="h-3.5 inline"/>*/}
                    {/*        <div className="ml-1">Add to Cart</div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
            {/*    </div>*/}
            {/*)}*/}
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

type EcommerceShowCaseProps = {
    showFlowChart: boolean
    setShowFlowChart: (arg: boolean) => void
}

export default function EcommerceShowCase({showFlowChart, setShowFlowChart}: EcommerceShowCaseProps) {
    const [filters, setFilters] = useState<FilterCondition[] | undefined>();
    const url = 'https://visionapi.jina.ai/' + (filters ? filters[0].value: '')
    // const url = 'http://34.159.58.52:' + (filters ? filters[0].value: '')
    // const url = 'http://localhost:' + (filters ? filters[0].value: '')
    console.log('my url', url)
    const [originalDocuments, setOriginalDocuments] = useState<RawDocumentData[]>([]);
    const [addDesc, setAddDesc] = useState("")
    const [queries, setQueries] = useState<SimpleQueries>([]);
    const [results, setResults] = useState<SimpleResults[]>([]);
    const [searching, setSearching] = useState(false);
    const [firstSearchTriggered, setFirstSearchTriggered] = useState(false)
    const resultsRef = useRef<HTMLDivElement>(null)
    const [isFlowChartOpenedOnce, setIsFlowChartOpenedOnce] = useState(false)
    let debouncedFlowChartOpen = useCallback(debounce(() => setShowFlowChart(true), 1000), [])

    useEffect(() => {

        if (originalDocuments.length) {
            if (addDesc !== "") search(addDesc, ...originalDocuments);
            else search(...originalDocuments)
        }
    }, [filters]);

    const customReqSerializer = async (documents: RawDocumentData[]) => {
        let uri = ""
        let text = null

        if (documents[0] instanceof File) {
            uri = await fileToBase64(documents[0] as File)
        }
        if (typeof documents[0] === "string" && isValidHttpUrl(documents[0])) {
            uri = documents[0]
        }

        if (documents.length === 2 && documents[1] instanceof File && typeof documents[0] === "string") {
            text = documents[0] as string
            uri = await fileToBase64(documents[1] as File)
        }

        if (documents.length === 2 && isValidHttpUrl(documents[1] as string) && typeof documents[0] === "string") {
            text = documents[0] as string
            uri = documents[1] as string
        }


        const request = {
            "data": [
                {
                    uri,
                    text
                }
            ],
            "parameters": {
                "top_k": 10,
                'conditions': filters
            }
        }
        return request
    }

    const customResSerializer = (response: AnyObject) => {

        return {
            queries: [],
            results: [response.data.data.docs[0].matches]
        }
    }

    const jina = new JinaClient(url, schema as OpenAPIV3.Document, false, customReqSerializer, customResSerializer)


    async function search(...documents: RawDocumentData[]) {
        if(searching) return
        setFirstSearchTriggered(true)
        setResults([])
        setSearching(true);
        const {results, queries} = await jina.search(...documents);
        setSearching(false);
        setResults(results);
        setQueries(queries);
        resultsRef.current?.scrollIntoView({behavior: "smooth", block: "center"})
        !isFlowChartOpenedOnce && debouncedFlowChartOpen()
        setIsFlowChartOpenedOnce(true)
    }


    const onFilter = (filters: FilterCondition[]) => {
        setFilters([...filters]);
    };

    function handleExampleQuery(query: ExampleQueryItem){
        const {src,text} = query;

        if(!src) return;

        setOriginalDocuments([src]);

        if(text)
            onFilter([{attribute: "color", operator: "eq", value: text}]);
        else
            search(src);
    }

    return (
        <div className="px-6">
            <Head>
                <title>Shop The Look | Jina AI | Jina AI is a Neural Search Company </title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">Search fashion products with an image+description</p>
                <Dropzone onDrop={acceptedFiles => {
                    setOriginalDocuments(acceptedFiles)
                    search(addDesc, ...acceptedFiles)
                }}>
                    {({getRootProps, getInputProps}) => (
                        <div {...getRootProps()}
                             className="border-b-0 cursor-pointer border border-primary-500 rounded-t flex flex-col items-center p-8 ">
                            <div className="h-8 w-8 mb-3">
                                <img src={SearchIcon}/>
                            </div>
                            <input {...getInputProps()} />
                            <p className="font-bold w-72 text-center">Drag and drop your image here or <span
                                className="text-primary-500">Browse</span> to select a file
                            </p>
                        </div>
                    )}
                </Dropzone>

                {/*TODO get back*/}
                {/*<input*/}
                {/*    onChange={(event) => setAddDesc(event.target.value)}*/}
                {/*    onKeyUp={(event) => { if(event.key === 'Enter') search(addDesc, ...originalDocuments) }}*/}
                {/*    className="textInput appearance-none block w-full text-gray-700 border border-primary-500 rounded-b py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"*/}
                {/*    id="grid-first-name" type="text" placeholder="Add additional description"/>*/}
                <style jsx>
                    {`
                      .textInput {
                        border-top-color: #E5E5E5;
                      }
                    `}
                </style>
            </div>

            <Filters onFilter={onFilter}/>
            <div className="my-6">
                <ExampleQueries queries={exampleQueries} onClick={handleExampleQuery} size="small"/>
            </div>


            {
                !firstSearchTriggered ?
                    <br/>
                    // TODO bring back
                    // <About
                    //     className="mt-6"
                    //     aboutPoints={[
                    //         "e-commerce platforms are a common use-case of Jina. The e-commerce showcase lets you find similar products based on an image. You can even refine your search by adding some text to the query."
                    //     ]}/>
                    :
                    <div ref={resultsRef}>
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
                    </div>
            }


        </div>

    );
}
