import { useMemo } from "react";

export function useAppItem(app, accounts) {
  const isDownloadable = useMemo(() => {
    return app?.contentHash !== "";
  }, [app?.contentHash]);

  const isAppOwner = useMemo(() => {
    return app?.owner === accounts[0];
  }, [accounts, app?.owner]);

  return {
    isAppOwner,
    isDownloadable,
  };
}
