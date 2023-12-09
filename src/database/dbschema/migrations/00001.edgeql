CREATE MIGRATION m1kcmhbqvgcao5s2qndaa7ob2k5brlao7p7udi4cg3t5zkzigudeya
    ONTO initial
{
  CREATE SCALAR TYPE default::AccessConditionType EXTENDING enum<None, OwnsNftInCollection, OwnsSingleNft>;
  CREATE SCALAR TYPE default::Address EXTENDING std::str {
      CREATE CONSTRAINT std::regexp('0x[a-fA-F0-9]{40}');
  };
  CREATE TYPE default::AccessCondition {
      CREATE PROPERTY chainId: std::int16 {
          CREATE CONSTRAINT std::min_value(1);
      };
      CREATE REQUIRED PROPERTY conditionType: default::AccessConditionType;
      CREATE PROPERTY contractAddress: default::Address;
      CREATE PROPERTY tokenId: std::str;
  };
  CREATE TYPE default::Page {
      CREATE MULTI LINK conditions: default::AccessCondition;
      CREATE PROPERTY content: std::str;
      CREATE PROPERTY creatorAddress: default::Address;
      CREATE REQUIRED PROPERTY title: std::str;
  };
};
