CREATE MIGRATION m1dpybjc7ztvnbgpvauefl263j3zokeigwyucko4docw73gp2bd76a
    ONTO m16sux4yvgzw6f7swkegbgat2b5qq7ofe6dl3sclkwywjjejwc533q
{
  ALTER TYPE default::Page {
      ALTER PROPERTY title {
          CREATE CONSTRAINT std::min_len_value(1);
      };
  };
};
