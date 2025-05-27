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

const ThemeSelector = ({
  themeOptions,
  selectedTheme,
  setSelectedTheme,
  linkActivation,
  id,
  loading,
  showNotification, // Receive the notification function
}) => {
  const router = useRouter();
  const updateTheme = useThemeUpdate();
  const handleActivateClick = () => {
    if (isVisibleForMinted) {
      updateTheme.mutate(
        {
          schoolId: id,
          themeId: selectedTheme,
        },
        {
          onSuccess: () => {
            toggleVisibilityForMinted();
            setOpen(true);
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

  const [open, setOpen] = useState(false);

  const handleRequestClose = () => {
    setOpen(false);
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
      >
        <div style={{ textAlign: 'left', padding: '20px' }}>
          <p style={{ color: 'gray', marginTop: '10px' }}>
            Theme updated successfully! 🎨 Your school just got a new look."
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ThemeSelector;
