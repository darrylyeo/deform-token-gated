CREATE MIGRATION m1gln7g5gad6act636se3wwckizzrk4bcs3yzm6oyu7h3nhqpldjxq
    ONTO m1l7ltm3mmyquvgsu6cifc43cohhcchqvoftd3dl7c4ajed6wphjaa
{
  ALTER TYPE default::Page {
      ALTER PROPERTY creatorAddress {
          SET REQUIRED USING (<default::Address>{});
      };
  };
};
