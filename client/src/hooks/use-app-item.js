import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useMemo } from "react";
import { ETHER_SYMBOL } from "utils";

dayjs.extend(LocalizedFormat);

export function useAppItem(app, web3, accounts, allLicenses) {
  const isDownloadable = useMemo(() => {
    return app?.contentHash !== "";
  }, [app?.contentHash]);

  const isAppOwner = useMemo(() => {
    return app?.owner === accounts[0];
  }, [accounts, app?.owner]);

  const formattedPrice = useMemo(() => {
    return web3 && app?.price
      ? `${web3?.utils.fromWei(app?.price).toString()} ${ETHER_SYMBOL}`
      : "";
  }, [app?.price, web3]);

  const formattedDateCreated = useMemo(() => {
    return dayjs(app?.date).format("LLLL");
  }, [app?.date]);

  const isLicenseOwner = useMemo(() => {
    return (
      allLicenses &&
      allLicenses.findIndex((license) => {
        return (
          license.appId === app?.id &&
          (license.dateExpired === 0 ||
            dayjs(license.dateExpired * 1000).isAfter(dayjs()))
        );
      }) !== -1
    );
  }, [allLicenses, app?.id]);

  return {
    isAppOwner,
    isDownloadable,
    formattedPrice,
    formattedDateCreated,
    isLicenseOwner,
  };
}
