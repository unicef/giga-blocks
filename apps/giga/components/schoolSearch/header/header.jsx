'use client';

import { useState } from 'react';
import './_header.scss';
import { useRouter } from 'next/navigation';

export default function SchoolHeader() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/schools/list?name=${searchTerm}`);
  };

  return (
    <header className="school-list-header">
      <div className="school-list-header__container">
        <h1 className="school-list-header__title">
          Ready to make a difference?
          <br />
          Let's find a school to activate
        </h1>

        <p className="school-list-header__description">
          Go ahead and use the search bar to find schools instantly. Once you
          find a school, activating it is just a few clicks away!
        </p>

        <form
          className="school-list-header__search-form"
          onSubmit={handleSearch}
        >
          <div className="school-list-header__search-container">
            <input
              type="text"
              className="school-list-header__search-input"
              placeholder="Search for school name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search for school name"
            />
            <button type="submit" className="school-list-header__search-button">
              Search
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="school-list-header__search-icon"
              >
                <path
                  d="M14.5 14.5L10.5 10.5M12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
        <p className="view-all-school-list">
          Or, <span onClick={() => router.push('/schools/list')}>View all</span>{' '}
          17,539 schools list
        </p>
      </div>
    </header>
  );
}
