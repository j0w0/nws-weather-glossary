import { useState } from "react";
import { useWeatherGlossary } from "../../hooks/useWeatherGlossary";

export default function GlossaryList({ searchTerm }) {
    const [showAll, setShowAll] = useState(false);
    
    let glossary = useWeatherGlossary();

    // filter by search term
    glossary = glossary.filter((item, idx) => {
        const lowerCaseTerm = item.term.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        if (lowerCaseTerm.indexOf(lowerCaseSearchTerm) !== -1) return item;
    });

    // show first 10, or show all
    glossary = glossary.filter((item, idx) => {
        if (idx < 10 || showAll) return item;
    });

    const handleShowAllClick = () => setShowAll(!showAll);

    return glossary ? (
        <>
            <ol>
                {glossary.map(({ term, definition }, idx) => {
                return (
                    <li key={`${term}-${idx}`}>
                    <strong>{term}</strong>
                    <br />
                    {definition}
                    </li>
                );
                })}
            </ol>

            <button
                type="button"
                className="btn btn-primary"
                onClick={handleShowAllClick}
            >
                {showAll ? "Hide" : "Show All"}
            </button>
        </>
    ) : (
        <>Loading...</>
    )
}