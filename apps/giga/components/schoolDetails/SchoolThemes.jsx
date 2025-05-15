'use client';

import { ArrowLeft } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import { useThemeToggleStore } from '../../app/store/themeToggleStore';
import { useThemeStore } from '../../app/store/themeStore';
import { useRouter } from 'next/navigation';
import { useThemeUpdate } from '../../app/hooks/useTheme/index';
import Image from 'next/image';
import './_themeSelector.scss';

const ThemeSelector = ({
  themeOptions,
  selectedTheme,
  setSelectedTheme,
  linkActivation,
  id,
  loading,
}) => {
  const router = useRouter();
  const updateTheme = useThemeUpdate();
  const handleActivateClick = () => {
    if (isVisibleForMinted) {
      updateTheme.mutate({
        schoolId: id,
        themeId: selectedTheme,
      });
    } else {
      const url = linkActivation
        ? `${id}/activate-school?linkActivation=${linkActivation}`
        : `${id}/activate-school`;
      router.push(url);
    }
  };
  const isVisibleForMinted = useThemeToggleStore(
    (state) => state.isVisibleForMinted
  );
  const setTheme = useThemeStore((state) => state.setTheme);

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    const selected = themeOptions.find((t) => t.id === themeId);
    if (selected?.colorScheme) {
      const { bgColor, cardColor, fontColor } = selected.colorScheme || {};
      if (fontColor && bgColor) {
        setTheme(fontColor, cardColor, bgColor, selected.name, selected.id);
      }
    }
  };
  return (
    <div className="theme-selector">
      <div className="theme-selector__content">
        <div className="theme-selector__info">
          <p className="theme-selector__description">
            Every activated school gains a permanent seat on the blockchain, one
            step closer to reliable internet access. Once the school is
            activated, a unique image is generated.
          </p>
          <div className="theme-selector__brand">Giga Blocks</div>
        </div>

        <div className="theme-selector__options">
          <p className="theme-selector__prompt">
            Preview themes below and choose one before you activate
          </p>

          <div className="theme-selector__themes">
            {!loading &&
              themeOptions?.map((theme) => (
                <button
                  key={theme.id}
                  className={`theme-selector__theme-option ${
                    selectedTheme === theme.id ? 'selected' : ''
                  }`}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  <div
                    className="theme-selector__theme-color"
                    style={{ backgroundColor: theme.colorScheme?.fontColor }}
                  />
                  <div
                    className="theme-selector__theme-color"
                    style={{ backgroundColor: theme.colorScheme?.cardColor }}
                  />
                  <div
                    className="theme-selector__theme-color"
                    style={{ backgroundColor: theme.colorScheme?.bgColor }}
                  />
                </button>
              ))}
          </div>

          <Button
            onClick={handleActivateClick}
            className="theme-selector__activate-btn"
            disabled={!selectedTheme}
          >
            {isVisibleForMinted ? 'Update' : 'Activate'}{' '}
            <ArrowLeft className="rotate-180" size={16} />
          </Button>
        </div>
      </div>
      <div className="theme-selector__illustration">
        <Image
          src="/images/earth-illustration.png"
          alt="People working with a globe"
          width={582}
          height={582}
        />
      </div>
    </div>
  );
};

export default ThemeSelector;
