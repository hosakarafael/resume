import { useEffect, useRef } from "react";
import { useToggle } from "../../hook/useToggle";
import css from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  placeHolder: string;
  onSubmit?: (searchQuery: string) => void;
  onChange?: (searchQuery: string | undefined) => void;
  expanded?: boolean;
  expandable?: boolean;
}

function SearchBar({
  placeHolder,
  onSubmit,
  onChange,
  expanded = false,
  expandable = false,
}: SearchBarProps) {
  const [showSearch, toggleSearch] = useToggle(expanded);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showSearch) {
      searchRef?.current?.focus();
    }
  }, [showSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchQuery = searchRef?.current?.value;
    if (onSubmit && searchQuery) {
      onSubmit(searchQuery);
    }
  };

  const handleChange = () => {
    if (onChange) {
      onChange(searchRef?.current?.value);
    }
  };

  const searchBar = () => {
    return (
      <div className={`${css["search-container"]} ${css.expanded}`}>
        <label htmlFor="search-input">
          <form
            className={css["search__form"]}
            onSubmit={(e) => handleSubmit(e)}
          >
            <FontAwesomeIcon
              className={`${css["search-icon"]}`}
              icon={faMagnifyingGlass}
            />

            <input
              id="search-input"
              ref={searchRef}
              className={`${css.search} p1`}
              placeholder={placeHolder}
              onChange={handleChange}
            />
          </form>
        </label>
      </div>
    );
  };

  const expandableSearchBar = () => {
    return showSearch ? expandedBar() : unExpandedBar();
  };

  const expandedBar = () => {
    return (
      <div className={`${css["search-container"]} ${css.expanded}`}>
        <form className={css["search__form"]} onSubmit={(e) => handleSubmit(e)}>
          <FontAwesomeIcon
            onClick={toggleSearch}
            className={css["search-icon"]}
            icon={faChevronLeft}
          />

          <input
            ref={searchRef}
            className={`${css.search} p1`}
            placeholder={placeHolder}
          />
        </form>
      </div>
    );
  };

  const unExpandedBar = () => {
    return (
      <div onClick={toggleSearch} className={`${css["search-container"]} p1`}>
        <FontAwesomeIcon
          className={css["search-icon"]}
          icon={faMagnifyingGlass}
        />
      </div>
    );
  };

  if (!expandable) {
    return searchBar();
  }

  return expandableSearchBar();
}

export default SearchBar;
