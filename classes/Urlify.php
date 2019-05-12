<?php

/**
 * Copyright (c) Holger Irmler
 *
 * This file is part of Onepage_XH.
 *
 * Onepage_XH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Onepage_XH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Onepage_XH.  If not, see <http://www.gnu.org/licenses/>.
 */

namespace Onepage;

class Urlify
{
  /**
   * @param int $i index of the page
   * @return string
   */
  public static function makeUniqueUrl($i)
  {
    global $u;

    $url = str_replace('/', '_', urldecode($u[$i]));
    $url = preg_replace('/[^a-zA-Z0-9_-]/', '', 'id' . $i . '_' . $url);
    return $url;
  }
}
