# Local fallback for capability images

Place the 9 capability images here when Supabase URLs fail (e.g. bucket missing or files deleted).

Required filenames:
- Deep Design Proficiency.webp
- Expert Product Development.webp
- End-to-End Garment Manufacturing.webp
- image.webp
- embroidery.webp
- DTF Printing.webp
- Screen Printing.webp
- vinayl printing.webp
- fabric rolls.webp

Then run:
```
IMAGEKIT_PRIVATE_KEY=private_0x3IIdSeJ+sC1Dv3gh8Jr+2B+N8= npm run migrate:supabase-to-imagekit -- --local-fallback=scripts/source-assets
```
