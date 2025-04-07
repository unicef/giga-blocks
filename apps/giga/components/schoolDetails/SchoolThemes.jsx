import { ArrowLeft } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { useThemeToggleStore } from '../../app/store/themeToggleStore';

const ThemeSelector = ({
  themeOptions,
  selectedTheme,
  setSelectedTheme,
  id,
}) => {
  const isVisibleForMinted = useThemeToggleStore(
    (state) => state.isVisibleForMinted
  );
  console.log('isVisibleForMinted', isVisibleForMinted);
  return (
    <div className="school-details__theme-selector">
      <h3 className="school-details__section-title">Select Theme</h3>
      <p className="school-details__section-description">
        Click a theme below to preview and select it for the activated school
        view.
      </p>

      <div className="school-details__themes">
        {themeOptions.map((theme) => (
          <button
            key={theme.id}
            className={`school-details__theme-option ${
              selectedTheme === theme.id ? 'selected' : ''
            }`}
            onClick={() => setSelectedTheme(theme.id)}
          >
            {theme.colors.map((color, index) => (
              <div
                key={index}
                className="school-details__theme-color"
                style={{ backgroundColor: color }}
              />
            ))}
          </button>
        ))}
      </div>

      <p className="school-details__lorem">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </p>

      <Button
        href={`${id}/activate-school`}
        className="school-details__activate-btn"
      >
        {isVisibleForMinted ? 'Update' : 'Activate'}{' '}
        <ArrowLeft className="rotate-180" size={16} />
      </Button>
    </div>
  );
};

export default ThemeSelector;
