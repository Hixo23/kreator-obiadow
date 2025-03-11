import { useTheme } from "../../theme-provider";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogContent,
  DialogHeader,
} from "../../ui/shadcn/dialog";
import { Switch } from "../../ui/shadcn/switch";

export const SettingsModal = ({ children }: { children: React.ReactNode }) => {
  const { setTheme, theme } = useTheme();
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ustawienia</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <Switch
            onCheckedChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            checked={theme === "dark"}
          />
          <p>Ciemny motyw</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
