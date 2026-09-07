import React from 'react';
import PreviewCard from './PreviewCard';
import CopyPageButton from './CopyPageButton';

// Reads the prompt straight out of a showcase's own hidden footer <code> tag
// (see .prompt-embed in index.css), so there's no separate copy to keep in
// sync with the component's real generation prompt.
function usePromptFromDom(ref) {
    const [prompt, setPrompt] = React.useState(null);
    React.useEffect(() => {
        const codeEls = ref.current?.querySelectorAll('code');
        const last = codeEls && codeEls.length ? codeEls[codeEls.length - 1] : null;
        setPrompt(last?.textContent?.trim() || null);
    }, [ref]);
    return prompt;
}

export default function ComponentDetail({ category, entry, detail }) {
    const previewRef = React.useRef(null);
    const prompt = usePromptFromDom(previewRef);

    return (
        <div className="flex flex-col gap-5 w-full max-w-[760px]">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                    <h1 className="text-[26px] md:text-[30px] font-heading font-bold text-charcoal tracking-tight">{entry.title}</h1>
                    <p className="text-[14px] text-stone">
                        {detail?.description || `A ${entry.title.toLowerCase()} component, ready to preview, copy, or ship.`}
                    </p>
                </div>
                <CopyPageButton prompt={prompt} code={detail?.code} />
            </div>

            <p className="text-[13px] font-medium text-stone">{category.name}</p>

            <PreviewCard
                title={entry.title}
                Component={entry.Component}
                code={detail?.code}
                previewRef={previewRef}
                preserveBg={category.id === 'bgs'}
            />

            <div className="rounded-lg bg-white border border-mist p-4 flex flex-col gap-2">
                <p className="text-[11px] font-semibold text-stone uppercase tracking-widest select-none">Prompt</p>
                <p className="text-[13px] text-charcoal font-mono leading-relaxed whitespace-pre-wrap">
                    {prompt || 'No prompt captured for this component yet.'}
                </p>
            </div>
        </div>
    );
}
