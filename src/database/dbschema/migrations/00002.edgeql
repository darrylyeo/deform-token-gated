CREATE MIGRATION m15g4bjbardqlynuwetz573ez76kpnrxn62h7dvalgg7acflqezxda
    ONTO m1kcmhbqvgcao5s2qndaa7ob2k5brlao7p7udi4cg3t5zkzigudeya
{
  ALTER TYPE default::AccessCondition {
      ALTER PROPERTY tokenId {
          SET TYPE std::int16 USING (<std::int16>.tokenId);
      };
  };
};
