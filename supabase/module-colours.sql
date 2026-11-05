-- Allows the 8 extra module colours. Run once in the Supabase SQL editor.

alter table modules drop constraint if exists modules_color_check;
alter table modules add constraint modules_color_check check (
  color in ('lime', 'sky', 'butter', 'coral', 'mint', 'aqua', 'periwinkle', 'lilac', 'pink', 'peach', 'sand', 'stone')
);
