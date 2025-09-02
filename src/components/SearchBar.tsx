import { useState } from 'react';
import { FaSearch} from 'react-icons/fa';

type SearchProps = {
  onApply: (prompt: string) => void;
  errorMsg?: string | null;
};

const SearchBar = ({ onApply, errorMsg }: SearchProps) => {
  const [prompt, setPrompt] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onApply(prompt);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2 w-full max-w-xl mb-8">
      <div className="flex items-center bg-white rounded-2xl shadow px-3 py-3 w-full">
        <FaSearch className="text-gray-500 mr-2 shrink-0" aria-hidden="true" />
        <label htmlFor="prompt" className="sr-only">Ask about the latest earthquakes</label>
        <input
          id="prompt"
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder='Try: "Earthquakes above magnitude 6 in Japan"'
          className="w-full bg-transparent outline-none text-gray-700 text-sm sm:text-base"
          aria-label="Prompt input"
        />
      </div>

      {errorMsg && (
        <p role="alert" className="text-sm text-red-600">{errorMsg}</p>
      )}
    </form>
  );
}

export default SearchBar;
