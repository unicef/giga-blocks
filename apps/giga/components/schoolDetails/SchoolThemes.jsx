'use client';

import { ArrowLeft } from '@carbon/icons-react';
import { Button, Modal } from '@carbon/react';
import { useThemeToggleStore } from '../../app/store/themeToggleStore';
import { useThemeStore } from '../../app/store/themeStore';
import { useRouter } from 'next/navigation';
import { useThemeUpdate } from '../../app/hooks/useTheme/index';
import Image from 'next/image';
import './_themeSelector.scss';
import { useState } from 'react';
import { ColorPalette, Location, ArrowRight } from '@carbon/icons-react';

const ThemeSelector = ({
  themeOptions,
  selectedTheme,
  setSelectedTheme,
  linkActivation,
  id,
  loading,
  showNotification,
  SchoolName,
  country_name,
}) => {
  const router = useRouter();
  const updateTheme = useThemeUpdate();

  const [open, setOpen] = useState(false);
  const handleActivateClick = () => {
    if (isVisibleForMinted) {
      updateTheme.mutate(
        {
          schoolId: id,
          themeId: selectedTheme,
        },
        {
          onSuccess: () => {
            setOpen(true);
            // toggleVisibilityForMinted();
          },
          onError: (error) => {
            toggleVisibilityForMinted();
            console.error('Error updating theme:', error);
            showNotification(
              'error',
              'Error Updating Theme',
              'Failed to update the school theme. Please try again.'
            );
          },
        }
      );
    } else {
      const url = linkActivation
        ? `${id}/activate-school?linkActivation=${linkActivation}`
        : `${id}/activate-school`;
      router.push(url);
    }
  };

  const handleRequestClose = () => {
    setOpen(false);
    toggleVisibilityForMinted();
  };

  const isVisibleForMinted = useThemeToggleStore(
    (state) => state.isVisibleForMinted
  );

  const toggleVisibilityForMinted = useThemeToggleStore(
    (state) => state.toggleVisibilityForMinted
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

  // Get the selected theme name
  const getSelectedThemeName = () => {
    const selected = themeOptions?.find((t) => t.id === selectedTheme);
    return selected?.name || 'Default';
  };

  // Get the selected theme colors
  const selectedThemeColors = themeOptions?.find(
    (t) => t.id === selectedTheme
  )?.colorScheme;

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
                    style={{
                      backgroundColor: theme.colorScheme?.fontColor,
                      borderTopLeftRadius: '4px',
                      borderBottomLeftRadius: '4px',
                    }}
                  />
                  <div
                    className="theme-selector__theme-color"
                    style={{ backgroundColor: theme.colorScheme?.cardColor }}
                  />
                  <div
                    className="theme-selector__theme-color"
                    style={{
                      backgroundColor: theme.colorScheme?.bgColor,
                      borderTopRightRadius: '4px',
                      borderBottomRightRadius: '4px',
                    }}
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
      <Modal
        open={open}
        preventCloseOnClickOutside={true}
        passiveModal
        onRequestClose={handleRequestClose}
        size="md"
        hasCloseIcon={false}
        className="theme-update-modal"
      >
        <div className="theme-update-modal-icon">
          <ColorPalette size={24} fill="#ffffff" />
        </div>
        <h3 className="theme-update-modal-modal-description">
          Theme Updated Successfully! 🎉
        </h3>

        <p className="theme-update-modal-details">
          {SchoolName ? SchoolName : 'School'} is now using the{' '}
          <strong>{getSelectedThemeName()}</strong> theme
        </p>

        <div className="theme-color-selector">
          <div className="theme-selector-school-name">
            <div> {SchoolName}</div>
            <div className="theme-selector-location">
              <Location />
              {country_name}
            </div>
          </div>
          {selectedThemeColors && (
            <div className="theme-update-modal-theme-preview">
              <div className="theme-preview-container">
                <div
                  className="theme-preview-color"
                  style={{
                    backgroundColor: selectedThemeColors.fontColor,
                    borderTopLeftRadius: '4px',
                    borderBottomLeftRadius: '4px',
                  }}
                ></div>
                <div
                  className="theme-preview-color"
                  style={{
                    backgroundColor: selectedThemeColors.cardColor,
                  }}
                ></div>
                <div
                  className="theme-preview-color"
                  style={{
                    backgroundColor: selectedThemeColors.bgColor,
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <Button
          className="theme-update-button"
          kind="primary"
          renderIcon={ArrowRight}
          onClick={() => {
            handleRequestClose(); // Close the modal
            router.push(`/schools/${id}`); // Navigate to the school details page
          }}
        >
          View Updated School Page
        </Button>
      </Modal>
    </div>
  );
};

export default ThemeSelector;
