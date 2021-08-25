import Head from "next/head";
import { SimpleResults } from "@jina-ai/jinajs";
import { Results } from "../components/Results";
import { SearchDemo } from "../components/SearchDemo";

const sampleQueries: SimpleResults = [
  {
    score: 0.8,
    data: "This is a text query",
    mimeType: "text/plain",
  },
  {
    score: 0.8,
    data: "Another Text Query",
    mimeType: "text/plain",
  },
  {
    score: 0.8,
    data: "A third text query",
    mimeType: "text/plain",
  },
  {
    score: 0.8,
    data: "Wow a fourth text query can you believe it",
    mimeType: "text/plain",
  },
  {
    score: 0.8,
    data: "Yet a fifth text query",
    mimeType: "text/plain",
  },
];

const sampleResults: SimpleResults[] = [
  [
    {
      score: 0.8,
      data: "Hey look a text result",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "Oh another text result",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "Here's another just for good measure",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "Oh and a fourth",
      mimeType: "text/plain",
    },
  ],
  [
    {
      score: 0.8,
      data: "This is for the second text query",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "These are different results",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "This is a fourth result",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "Wait this is the fourth, the one above is third",
      mimeType: "text/plain",
    },
  ],
  [
    {
      score: 0.8,
      data: "Now these results are for the third text query",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "As you can see there is not a lot of different sample text options to use",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "lorem ipsum quacamole",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "something something abcdef",
      mimeType: "text/plain",
    },
  ],
  [
    {
      score: 0.8,
      data: "i'm running out of ideas",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "ar arst arat ar varczxvvarta tartartqfpqdadarsarv x x xv x",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "xcv b tdrstd rs f fgh w v va sv rv at a v b afv",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "h  io e no k  y ;yl d ;lh oe n  ;hyu dyh  hn hhujuljlyjl jy g ",
      mimeType: "text/plain",
    },
  ],
  [
    {
      score: 0.8,
      data: "iarsr'm rusvarsvnning out a idearsttas",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "ar arst starstarsrattarstarr varrsczxvvarta tartartqfpqdadarsarv x x xv x",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "xcv b tdrstd rs f fgh w v va strtsartsartv rv at a v b afv",
      mimeType: "text/plain",
    },
    {
      score: 0.8,
      data: "h  io e no k  y ;yartlarstarst d ;rtsartsarstlh oe n  ;hyu ararstatsdyh  hn hhujuljlyjl jy g ",
      mimeType: "text/plain",
    },
  ],
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Jina Showcases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="demo-container grid col-span-1 space-y-4">
          <Results
            queries={sampleQueries}
            results={sampleResults}
            display="grid"
          />
        </div>
      </main>
    </div>
  );
}
