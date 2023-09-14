import ThemeContrast from './ThemeContrast';
import ThemeRtlLayout from './ThemeRtlLayout';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeSettings({ children }: Props) {
  return (
    // <ThemeColorPresets>
    <ThemeContrast>
      <ThemeRtlLayout>{children}</ThemeRtlLayout>
    </ThemeContrast>
    // </ThemeColorPresets>
  );
}
