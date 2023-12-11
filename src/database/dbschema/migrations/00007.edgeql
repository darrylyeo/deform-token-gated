CREATE MIGRATION m1ho2jkig2btjslaus53h4pk5fztgh2od47cnem3wghhpenoj742sa
    ONTO m1dpybjc7ztvnbgpvauefl263j3zokeigwyucko4docw73gp2bd76a
{
  ALTER TYPE default::Page {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
