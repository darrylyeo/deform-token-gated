CREATE MIGRATION m1l7ltm3mmyquvgsu6cifc43cohhcchqvoftd3dl7c4ajed6wphjaa
    ONTO m15g4bjbardqlynuwetz573ez76kpnrxn62h7dvalgg7acflqezxda
{
  ALTER TYPE default::AccessCondition {
      ALTER PROPERTY tokenId {
          SET TYPE std::bigint;
      };
  };
};
